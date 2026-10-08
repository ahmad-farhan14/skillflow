CREATE TABLE IF NOT EXISTS topic_learning_progress (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id TEXT NOT NULL,
    proof_response TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, topic_id),
    CONSTRAINT valid_topic_learning_proof CHECK (
        (
            is_completed
            AND proof_response IS NOT NULL
            AND char_length(btrim(proof_response)) BETWEEN 20 AND 2000
            AND completed_at IS NOT NULL
        )
        OR (
            NOT is_completed
            AND completed_at IS NULL
            AND (
                proof_response IS NULL
                OR char_length(btrim(proof_response)) BETWEEN 20 AND 2000
            )
        )
    )
);

ALTER TABLE topic_learning_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their topic learning progress"
    ON topic_learning_progress;
CREATE POLICY "Users can view their topic learning progress"
    ON topic_learning_progress FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their topic learning progress"
    ON topic_learning_progress;
CREATE POLICY "Users can create their topic learning progress"
    ON topic_learning_progress FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their topic learning progress"
    ON topic_learning_progress;
CREATE POLICY "Users can update their topic learning progress"
    ON topic_learning_progress FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their topic learning progress"
    ON topic_learning_progress;
CREATE POLICY "Users can delete their topic learning progress"
    ON topic_learning_progress FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

REVOKE ALL ON TABLE topic_learning_progress FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE topic_learning_progress TO authenticated;
